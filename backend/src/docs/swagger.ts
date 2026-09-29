import type { OpenAPIV3 } from "openapi-types";

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.3",

  info: {
    title: "Task Manager API",
    version: "1.0.0",
    description: "API for managing personal tasks.",
  },

  servers: [
    {
      url: "http://localhost:8080/api",
      description: "Local development server",
    },
  ],

  tags: [
    {
      name: "Health",
      description: "Application health",
    },
    {
      name: "Tasks",
      description: "Task management",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Clerk session JWT",
      },
    },

    schemas: {
      TaskStatus: {
        type: "string",
        enum: [
          "TODO",
          "IN_PROGRESS",
          "IN_REVIEW",
          "COMPLETED",
        ],
      },

      Task: {
        type: "object",
        required: [
          "id",
          "title",
          "description",
          "status",
          "updatedAt",
        ],
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440000",
          },

          title: {
            type: "string",
            example: "Finish task manager",
          },

          description: {
            type: "string",
            nullable: true,
            example: "Finish the API and frontend.",
          },

          status: {
            $ref: "#/components/schemas/TaskStatus",
          },

          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-09-29T14:30:00.000Z",
          },
        },
      },

      CreateTaskInput: {
        type: "object",
        required: ["title"],

        properties: {
          title: {
            type: "string",
            maxLength: 200,
            example: "Finish task manager",
          },

          description: {
            type: "string",
            nullable: true,
            example: "Finish the API and frontend.",
          },

          status: {
            $ref: "#/components/schemas/TaskStatus",
          },
        },
      },

      UpdateTaskInput: {
        type: "object",

        properties: {
          title: {
            type: "string",
            maxLength: 200,
            example: "Finish task manager",
          },

          description: {
            type: "string",
            nullable: true,
            example: "Updated description.",
          },

          status: {
            $ref: "#/components/schemas/TaskStatus",
          },
        },

        minProperties: 1,
      },

      Error: {
        type: "object",
        required: ["message"],

        properties: {
          message: {
            type: "string",
            example: "Task not found",
          },
        },
      },
    },
  },

  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Check API health",

        responses: {
          "200": {
            description: "API is healthy",

            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "integer",
                      example: 200,
                    },
                    date: {
                      type: "string",
                      format: "date-time",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/tasks": {
      get: {
        tags: ["Tasks"],
        summary: "List tasks",
        description: "Returns all tasks belonging to the authenticated user.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          "200": {
            description: "Tasks returned successfully",

            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Task",
                  },
                },
              },
            },
          },

          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },

      post: {
        tags: ["Tasks"],
        summary: "Create a task",

        security: [
          {
            bearerAuth: [],
          },
        ],

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateTaskInput",
              },

              example: {
                title: "Finish task manager",
                description: "Complete the API documentation.",
                status: "TODO",
              },
            },
          },
        },

        responses: {
          "201": {
            description: "Task created successfully",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },

          "400": {
            description: "Invalid request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },

          "401": {
            description: "Unauthorized",
          },

          "409": {
            description: "A task with this title already exists",
          },
        },
      },
    },

    "/api/tasks/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,

          schema: {
            type: "string",
            format: "uuid",
          },

          example: "550e8400-e29b-41d4-a716-446655440000",
        },
      ],

      get: {
        tags: ["Tasks"],
        summary: "Get a task",

        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          "200": {
            description: "Task returned successfully",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },

          "401": {
            description: "Unauthorized",
          },

          "404": {
            description: "Task not found",
          },
        },
      },

      patch: {
        tags: ["Tasks"],
        summary: "Update a task",

        security: [
          {
            bearerAuth: [],
          },
        ],

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateTaskInput",
              },

              example: {
                status: "IN_PROGRESS",
              },
            },
          },
        },

        responses: {
          "200": {
            description: "Task updated successfully",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },

          "400": {
            description: "Invalid request",
          },

          "401": {
            description: "Unauthorized",
          },

          "404": {
            description: "Task not found",
          },
        },
      },

      delete: {
        tags: ["Tasks"],
        summary: "Delete a task",

        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          "204": {
            description: "Task deleted successfully",
          },

          "401": {
            description: "Unauthorized",
          },

          "404": {
            description: "Task not found",
          },
        },
      },
    },
  },
};