export interface SmtpConfigResponseDTO {
  id: string;
  service_provider: string;
  smtp_host: string;
  smtp_port: string;
  is_secure_ssl: boolean;
  smtp_username: string;
  smtp_password: string;
  createdAt: Date;
  updatedAt: Date;
}
