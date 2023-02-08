import { Identity } from "../../domains/entities/Identity";
import { IdentityRepository } from "./IdentityRepository";

const fakeIdentity = {
  email: "valid@email.co.uk",
  password: "Val1dP#ssword",
};

describe("Identity Repository", () => {
  describe("when adding a new user", () => {
    test("Should add an user correctly", async () => {
      // const identityRespository = new IdentityRepository();
      // const createdIdentity = await identityRespository.addIdentity(
      //   fakeIdentity
      // );
      // expect(createdIdentity).toEqual(fakeIdentity);
    });
  });
});
