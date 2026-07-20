import authorization from "models/authorization";
import { InternalServerError } from "infra/errors";

describe("models/authorization.js", () => {
  describe(".can()", () => {
    test("Without `user`", () => {
      expect(() => {
        authorization.can();
      }).toThrow(InternalServerError);
    });

    test("Without `feature`", () => {
      const createdUser = {
        features: [],
      };

      expect(() => {
        authorization.can(createdUser);
      }).toThrow(InternalServerError);
    });

    test("Without `user.features`", () => {
      const createdUser = {
        username: "UserWithoutFeatures",
      };

      expect(() => {
        authorization.can(createdUser);
      }).toThrow(InternalServerError);
    });

    test("With unknown `feature`", () => {
      const createdUser = {
        features: [],
      };

      expect(() => {
        authorization.can(createdUser, "unknown:feature");
      }).toThrow(InternalServerError);
    });

    test("With valid `user` and known `feature`", () => {
      const createdUser = {
        features: ["create:user"],
      };

      expect(authorization.can(createdUser, "create:user")).toBe(true);
    });

    test("With valid `user` and known `feature` but not authorized", () => {
      const createdUser = {
        features: ["read:user"],
      };

      expect(authorization.can(createdUser, "create:user")).toBe(false);
    });

    test("With valid `user` and known `feature` but not authorized to update another user", () => {
      const createdUser = {
        id: 1,
        features: ["update:user"],
      };

      const anotherUser = {
        id: 2,
        features: ["update:user"],
      };

      expect(authorization.can(createdUser, "update:user", anotherUser)).toBe(
        false,
      );
    });

    test("With valid `user` and known `feature` and authorized to update another user", () => {
      const createdUser = {
        id: 1,
        features: ["update:user:others"],
      };

      const anotherUser = {
        id: 2,
        features: ["update:user"],
      };

      expect(authorization.can(createdUser, "update:user", anotherUser)).toBe(
        true,
      );
    });

    test("With valid `user` and known `feature` and authorized to update self", () => {
      const createdUser = {
        id: 1,
        features: ["update:user"],
      };

      const anotherUser = {
        id: 1,
        features: ["update:user"],
      };

      expect(authorization.can(createdUser, "update:user", anotherUser)).toBe(
        true,
      );
    });
  });

  describe(".filterOutput()", () => {
    test("Without `user`", () => {
      expect(() => {
        authorization.filterOutput();
      }).toThrow(InternalServerError);
    });

    test("Without `feature`", () => {
      const createdUser = {
        features: [],
      };

      expect(() => {
        authorization.filterOutput(createdUser);
      }).toThrow(InternalServerError);
    });

    test("Without `user.features`", () => {
      const createdUser = {
        username: "UserWithoutFeatures",
      };

      expect(() => {
        authorization.filterOutput(createdUser);
      }).toThrow(InternalServerError);
    });

    test("With unknown `feature`", () => {
      const createdUser = {
        features: [],
      };

      expect(() => {
        authorization.filterOutput(createdUser, "unknown:feature");
      }).toThrow(InternalServerError);
    });

    test("With valid `user`, known `feature` and `resource`", () => {
      const createdUser = {
        features: ["read:user"],
      };

      const resource = {
        id: 1,
        username: "resource",
        features: ["read:user"],
        created_at: "2026-01-01T00:00:00.000Z",
        updated_at: "2026-01-01T00:00:00.000Z",
        email: "resource@resource.com",
        password: "resource",
      };

      const results = authorization.filterOutput(
        createdUser,
        "read:user",
        resource,
      );

      expect(results).toEqual({
        id: 1,
        username: "resource",
        features: ["read:user"],
        created_at: resource.created_at,
        updated_at: resource.updated_at,
      });
    });

    test("With valid `user`, known `feature` but no `resource`", () => {
      const createdUser = {
        features: [],
      };

      expect(() => {
        authorization.filterOutput(createdUser, "read:user");
      }).toThrow(InternalServerError);
    });

    test;
  });
});
