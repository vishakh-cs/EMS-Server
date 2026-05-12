const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");

const rawName = process.argv[2];

if (!rawName) {
  console.error("Usage: npm run make:api -- <resource-name>");
  process.exit(1);
}

const toKebabCase = (value) =>
  value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

const toCamelCase = (value) =>
  toKebabCase(value).replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());

const toPascalCase = (value) => {
  const camel = toCamelCase(value);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
};

const resourceName = toKebabCase(rawName);
const variableName = toCamelCase(rawName);
const className = toPascalCase(rawName);
const pluralPath = resourceName.endsWith("s") ? resourceName : `${resourceName}s`;

if (!resourceName) {
  console.error("Resource name must include at least one letter or number.");
  process.exit(1);
}

const moduleDir = path.join(srcDir, "modules", resourceName);
const routerPath = path.join(moduleDir, "presentation", "routes", `${resourceName}.ts`);
const controllerPath = path.join(moduleDir, "presentation", "controllers", `${className}.controller.ts`);
const dtoPath = path.join(moduleDir, "domain", "dto", `${resourceName}Create.dto.ts`);
const dtoResponsePath = path.join(moduleDir, "domain", "dto", `${resourceName}Response.dto.ts`);
const entityPath = path.join(moduleDir, "domain", "entities", `${resourceName}.entity.ts`);
const interfacePath = path.join(moduleDir, "domain", "interfaces", `${resourceName}.repository.ts`);
const mapperPath = path.join(moduleDir, "infrastructure", "mapper", `${resourceName}.mapper.ts`);
const modelPath = path.join(moduleDir, "infrastructure", "models", `${className}.ts`);
const repositoryPath = path.join(moduleDir, "infrastructure", "repositories", `Mongo${className}Repository.ts`);
const useCaseCreatePath = path.join(moduleDir, "use_cases", `Create${className}UseCase.ts`);
const useCaseGetPath = path.join(moduleDir, "use_cases", `Get${className}sUseCase.ts`);
const diPath = path.join(moduleDir, "di", "index.ts");
const mainRouterPath = path.join(srcDir, "routes", "index.ts");

const routerTemplate = `import { Router } from "express";
import { ${variableName}Controller } from "../../di";

const router = Router();

router.get("/", ${variableName}Controller.getAll.bind(${variableName}Controller));
router.post("/", ${variableName}Controller.create.bind(${variableName}Controller));

export default router;
`;

const controllerTemplate = `import { Request, Response } from "express";
import { ${className}CreateDTO } from "../../domain/dto/${resourceName}Create.dto";
import { Create${className}UseCase } from "../../use_cases/Create${className}UseCase";
import { Get${className}sUseCase } from "../../use_cases/Get${className}sUseCase";

export default class ${className}Controller {
  constructor(
    private readonly create${className}UseCase: Create${className}UseCase,
    private readonly get${className}sUseCase: Get${className}sUseCase
  ) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    const items = await this.get${className}sUseCase.execute();
    return res.json({ message: "Get all ${pluralPath}", data: items });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const dto: ${className}CreateDTO = req.body;
    const item = await this.create${className}UseCase.execute(dto);

    return res.status(201).json({
      message: "${className} created successfully",
      data: item,
    });
  }
}
`;

const dtoTemplate = `export interface ${className}CreateDTO {
  name: string;
}
`;

const dtoResponseTemplate = `export interface ${className}ResponseDTO {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
`;

const entityTemplate = `export interface ${className} {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
`;

const interfaceTemplate = `import { ${className} } from "../entities/${resourceName}.entity";
import { ${className}ResponseDTO } from "../dto/${resourceName}Response.dto";

export interface ${className}Repository {
  create(item: ${className}): Promise<${className}ResponseDTO>;
  findAll(): Promise<${className}ResponseDTO[]>;
}
`;

const mapperTemplate = `import { ${className}ResponseDTO } from "../../domain/dto/${resourceName}Response.dto";
import { ${className} } from "../../domain/entities/${resourceName}.entity";

export const toDomain = (data: any): ${className}ResponseDTO => {
  return {
    id: data._id?.toString() || data.id,
    name: data.name,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
  };
};
`;

const modelTemplate = `// Add your ODM/ORM model definition here (e.g. Mongoose schema)
export default {};
`;

const repositoryTemplate = `import { ${className} } from "../../domain/entities/${resourceName}.entity";
import { ${className}Repository } from "../../domain/interfaces/${resourceName}.repository";
import { ${className}ResponseDTO } from "../../domain/dto/${resourceName}Response.dto";
import { toDomain } from "../mapper/${resourceName}.mapper";

export class Mongo${className}Repository implements ${className}Repository {
  async create(item: ${className}): Promise<${className}ResponseDTO> {
    // Implement database creation logic
    // const createdItem = await Model.create(item);
    // return toDomain(createdItem);
    return toDomain({ ...item, _id: "dummy-id" });
  }

  async findAll(): Promise<${className}ResponseDTO[]> {
    // Implement database fetch logic
    // const items = await Model.find();
    // return items.map(toDomain);
    return [];
  }
}
`;

const useCaseCreateTemplate = `import { ${className}CreateDTO } from "../domain/dto/${resourceName}Create.dto";
import { ${className}ResponseDTO } from "../domain/dto/${resourceName}Response.dto";
import { ${className}Repository } from "../domain/interfaces/${resourceName}.repository";

export class Create${className}UseCase {
  constructor(private readonly repository: ${className}Repository) {}

  async execute(dto: ${className}CreateDTO): Promise<${className}ResponseDTO> {
    return this.repository.create({
      name: dto.name,
    });
  }
}
`;

const useCaseGetTemplate = `import { ${className}ResponseDTO } from "../domain/dto/${resourceName}Response.dto";
import { ${className}Repository } from "../domain/interfaces/${resourceName}.repository";

export class Get${className}sUseCase {
  constructor(private readonly repository: ${className}Repository) {}

  async execute(): Promise<${className}ResponseDTO[]> {
    return this.repository.findAll();
  }
}
`;

const diTemplate = `import ${className}Controller from "../presentation/controllers/${className}.controller";
import { Create${className}UseCase } from "../use_cases/Create${className}UseCase";
import { Get${className}sUseCase } from "../use_cases/Get${className}sUseCase";
import { Mongo${className}Repository } from "../infrastructure/repositories/Mongo${className}Repository";

export const ${variableName}Repository = new Mongo${className}Repository();
export const create${className}UseCase = new Create${className}UseCase(${variableName}Repository);
export const get${className}sUseCase = new Get${className}sUseCase(${variableName}Repository);

export const ${variableName}Controller = new ${className}Controller(
  create${className}UseCase,
  get${className}sUseCase
);
`;



const plannedFiles = [
  { path: routerPath, content: routerTemplate, label: "router" },
  { path: controllerPath, content: controllerTemplate, label: "controller" },
  { path: dtoPath, content: dtoTemplate, label: "dto" },
  { path: dtoResponsePath, content: dtoResponseTemplate, label: "response dto" },
  { path: entityPath, content: entityTemplate, label: "entity" },
  { path: interfacePath, content: interfaceTemplate, label: "repository interface" },
  { path: mapperPath, content: mapperTemplate, label: "mapper" },
  { path: modelPath, content: modelTemplate, label: "model" },
  { path: repositoryPath, content: repositoryTemplate, label: "repository" },
  { path: useCaseCreatePath, content: useCaseCreateTemplate, label: "create use case" },
  { path: useCaseGetPath, content: useCaseGetTemplate, label: "get use case" },
  { path: diPath, content: diTemplate, label: "di container" },
];

const toRelative = (filePath) => path.relative(rootDir, filePath);

const readMainRouter = () => fs.existsSync(mainRouterPath) ? fs.readFileSync(mainRouterPath, "utf8") : "";

const getMainRouterUpdate = () => {
  if (!fs.existsSync(mainRouterPath)) {
    return null;
  }

  const current = readMainRouter();
  const importLine = `import ${variableName}Router from "../modules/${resourceName}/presentation/routes/${resourceName}";`;
  const useLine = `router.use("/${pluralPath}", ${variableName}Router);`;

  if (current.includes(`/${pluralPath}`) && current.includes(importLine)) {
    return null;
  }

  let updated = current;

  if (!updated.includes(importLine)) {
    const importMatches = [...updated.matchAll(/^import .+;$/gm)];
    const lastImport = importMatches[importMatches.length - 1];

    if (lastImport) {
      const insertAt = lastImport.index + lastImport[0].length;
      updated = `${updated.slice(0, insertAt)}\n${importLine}${updated.slice(insertAt)}`;
    } else {
      updated = `${importLine}\n${updated}`;
    }
  }

  if (!updated.includes(useLine)) {
    const routerUseMatches = [...updated.matchAll(/^router\.use\(.+;$/gm)];
    const lastRouterUse = routerUseMatches[routerUseMatches.length - 1];

    if (lastRouterUse) {
      const insertAt = lastRouterUse.index + lastRouterUse[0].length;
      updated = `${updated.slice(0, insertAt)}\n${useLine}${updated.slice(insertAt)}`;
    } else {
      updated = updated.replace(
        "const router = Router();",
        `const router = Router();\n\n${useLine}`
      );
    }
  }

  return updated === current ? null : updated;
};

const mainRouterUpdate = getMainRouterUpdate();
const createTargets = plannedFiles.filter((file) => !fs.existsSync(file.path));
const skipTargets = plannedFiles.filter((file) => fs.existsSync(file.path));

console.log(`Resource: ${resourceName}`);
console.log("");
console.log("Will create:");

if (createTargets.length === 0) {
  console.log("  No new files.");
} else {
  createTargets.forEach((file) => {
    console.log(`  ${file.label}: ${toRelative(file.path)}`);
  });
}

if (mainRouterUpdate) {
  console.log(`  router registration: ${toRelative(mainRouterPath)}`);
}

if (skipTargets.length > 0) {
  console.log("");
  console.log("Will skip existing:");
  skipTargets.forEach((file) => {
    console.log(`  ${file.label}: ${toRelative(file.path)}`);
  });
}

if (createTargets.length === 0 && !mainRouterUpdate) {
  console.log("");
  console.log("Nothing to create or update.");
  process.exit(0);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("\\nCreate these files? (y/N): ", (answer) => {
  rl.close();

  if (answer.trim().toLowerCase() !== "y") {
    console.log("Cancelled. No files were created.");
    return;
  }

  createTargets.forEach((file) => {
    fs.mkdirSync(path.dirname(file.path), { recursive: true });
    fs.writeFileSync(file.path, file.content, "utf8");
  });

  if (mainRouterUpdate) {
    fs.writeFileSync(mainRouterPath, mainRouterUpdate, "utf8");
  }

  console.log("Done.");
});
