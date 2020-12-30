locals {
  task_definition_name = format("%s_%s", var.app_env, var.app_name)
  ecs_application_name = format("%s-%s", var.app_env, var.app_name)
}

variable "aws_region" {}
variable "aws_account_id" {}

variable "app_env" {}
variable "app_name" {}

variable "ecs_container_port" {
  default = 3000
}

variable "ecs_desired_count" {
  default = 1
}

variable "health_check_grace_period_seconds" {
  default = 60
}

variable "ecs_cpu" {
  default = 1
}

variable "ecs_memory_reservation" {
  default = 128
}
