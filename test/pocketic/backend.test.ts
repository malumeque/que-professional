import { PocketIc } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));
});

afterAll(async () => {
  await pic?.tearDown();
});

it("answers an empty-state read instead of trapping", async () => {
  // The canister is freshly installed, so no inquiry exists yet. This is the
  // read path the admin area depends on.
  await expect(actor.listInquiries()).resolves.toEqual([]);
});

it("round-trips a quote request through the real canister", async () => {
  const id = await actor.submitInquiry({
    name: "Thandi Dlamini",
    phone: "+268 7948 9466",
    email: "thandi@example.com",
    service: "Roofing",
    message: "Leaking roof over the kitchen.",
  });

  expect(id).toBe(0n);

  const inquiries = await actor.listInquiries();
  expect(inquiries).toHaveLength(1);
  expect(inquiries[0]).toMatchObject({
    id: 0n,
    name: "Thandi Dlamini",
    phone: "+268 7948 9466",
    email: "thandi@example.com",
    service: "Roofing",
    message: "Leaking roof over the kitchen.",
  });
  // createdAt is canister time in nanoseconds; it must be a real timestamp.
  expect(inquiries[0].createdAt).toBeGreaterThan(0n);
});

it("assigns increasing ids and returns newest first", async () => {
  const secondId = await actor.submitInquiry({
    name: "Sipho Mamba",
    phone: "+268 7600 0000",
    email: "",
    service: "Plumbing",
    message: "",
  });
  expect(secondId).toBe(1n);

  const inquiries = await actor.listInquiries();
  expect(inquiries.map((inquiry) => inquiry.id)).toEqual([1n, 0n]);
});

it("rejects an anonymous caller from the admin-only list", async () => {
  // A freshly created actor calls as the anonymous principal until an identity
  // is set, which is exactly the unauthenticated visitor the admin area must
  // keep out.
  const guest = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  await expect(guest.listInquiries()).rejects.toThrow(/Unauthorized: admin only/);
});

it("reports the caller as a non-admin before any sign-in", async () => {
  const guest = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  await expect(guest.isCallerAdmin()).resolves.toBe(false);
});
