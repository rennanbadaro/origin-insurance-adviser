terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region  = var.aws_default_region
  profile = var.aws_profile
}

module "ecr_repository" {
  source = "./modules/ecr"
}

module "ecs_cluster" {
  source  = "./modules/ecs/cluster"
  app_env = var.app_env
}

module "ecs_service" {
  source     = "./modules/ecs"
  aws_region = var.aws_default_region
  aws_account_id = var.aws_account_id
  app_env    = var.app_env
  app_name   = var.app_name
  depends_on = [module.ecs_cluster]
}
