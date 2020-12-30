data "aws_availability_zones" "available" {}

resource "aws_vpc" "app_vpc" {
  cidr_block = "172.31.0.0/16"
}

# Internet gateway for the public subnet
resource "aws_internet_gateway" "app_ig" {
  vpc_id = aws_vpc.app_vpc.id
}

# Public subnet 1
resource "aws_subnet" "app_public_sn_01" {
  vpc_id            = aws_vpc.app_vpc.id
  cidr_block        = "172.31.0.0/20"
  availability_zone = data.aws_availability_zones.available.names[0]
  tags = {
    Name = "app_public_sn_01"
  }
}

# Public subnet 2
resource "aws_subnet" "app_public_sn_02" {
  vpc_id            = aws_vpc.app_vpc.id
  cidr_block        = "172.31.16.0/20"
  availability_zone = data.aws_availability_zones.available.names[1]
  tags = {
    Name = "app_public_sn_02"
  }
}

# Routing table for public subnet 1
resource "aws_route_table" "app_public_sn_route_table_01" {
  vpc_id = aws_vpc.app_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.app_ig.id
  }
}

# Associate the routing table to public subnet 1
resource "aws_route_table_association" "app_public_sn_route_table_assn_01" {
  subnet_id      = aws_subnet.app_public_sn_01.id
  route_table_id = aws_route_table.app_public_sn_route_table_01.id
}

# Routing table for public subnet 2
resource "aws_route_table" "app_sn_route_table_02" {
  vpc_id = aws_vpc.app_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.app_ig.id
  }
}

# Associate the routing table to public subnet 2
resource "aws_route_table_association" "app_sn_route_table_assn_02" {
  subnet_id      = aws_subnet.app_public_sn_02.id
  route_table_id = aws_route_table.app_sn_route_table_02.id
}

# ECS Instance Security group
resource "aws_security_group" "app_public_sg" {
  name   = format("%s_%s_sg", var.app_env, var.app_name)
  vpc_id = aws_vpc.app_vpc.id

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = [
    "0.0.0.0/0"]
  }

  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
    cidr_blocks = [
    "0.0.0.0/0"]
  }

  # egress {
  #   # allow all traffic to private SN
  #   from_port = "0"
  #   to_port   = "0"
  #   protocol  = "-1"
  #   cidr_blocks = [
  #   "0.0.0.0/0"]
  # }
}
