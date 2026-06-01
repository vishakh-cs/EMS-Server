export interface SmtpConfigInputDto {
  
//provider details

service_provider: string;
smtp_host: string;
smtp_port: string;
is_secure_ssl: boolean;

//auth
smtp_username: string;
smtp_password: string;

}