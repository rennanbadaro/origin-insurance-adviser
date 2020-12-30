data "template_file" "task_definition" {
  template = file("${path.module}/base-task-definition.json")

  vars = {
    aws_region             = var.aws_region
    aws_account_id         = var.aws_account_id
    ecs_execution_role_arn = aws_iam_role.ecs_tasks_execution_role.arn
    ecs_application_name   = local.ecs_application_name
    ecs_container_port     = var.ecs_container_port
    ecs_memory_reservation = var.ecs_memory_reservation
    ecs_cpu                = var.ecs_cpu
    app_env                = var.app_env
  }
}

resource "aws_ecs_task_definition" "task_definition" {
  container_definitions = data.template_file.task_definition.rendered
  family                = local.task_definition_name
  network_mode          = "bridge"

  lifecycle {
    ignore_changes = all
  }

  depends_on = [data.template_file.task_definition]
}

