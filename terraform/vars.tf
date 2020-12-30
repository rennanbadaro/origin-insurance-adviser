variable "aws_account_id" {}

variable "aws_profile" {}

variable "aws_default_region" {
  default = "us-east-1"
}

variable "app_env" {
  default = "dev"
}

variable "app_name" {
  default = "insurance-adviser"
}
