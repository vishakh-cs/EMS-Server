import { NextFunction, Request, Response } from "express";
import ipRangeCheck from "ip-range-check";

import { getWhitelistIpsUseCase } from "../../modules/whitelist-ips/di";
import { organizationRepository } from "../../modules/organization/di";
import { DEFAULT_IP_ADDRESS } from "../../config";

export const protectedMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const email = req.body?.email;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const org =
            await organizationRepository.findByEmail(
                email
            );

        if (!org) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            });
        }

        const whitelistData =
            await getWhitelistIpsUseCase.execute(
                org.orgUID
            );

        const whitelistIPs =
            whitelistData?.whitelist_ips || [];

        const clientIP =
            req.headers["x-forwarded-for"]
                ?.toString()
                .split(",")[0]
                .trim() ||
            req.socket.remoteAddress ||
            "";

        const normalizedIP =
            clientIP.replace("::ffff:", "");

        console.log("Client IP:", whitelistIPs);

        const isAllowed =
            whitelistIPs.includes(DEFAULT_IP_ADDRESS) ||
            whitelistIPs.some((ip) =>
                ipRangeCheck(normalizedIP, ip)
            );

        if (!isAllowed) {
            return res.status(403).json({
                success: false,
                message:
                    "IP address is not whitelisted",
            });
        }

        next();
    } catch (error) {
        console.error(error);

        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
};