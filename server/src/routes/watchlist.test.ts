import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";

jest.mock("../models/watchlist.model", () => ({
  Watchlist: { find: jest.fn(), create: jest.fn(), findOneAndDelete: jest.fn() },
}));

import watchlistRouter from "./watchlist.routes";
import { Watchlist } from "../models/watchlist.model";

const app = express();
app.use(express.json());
app.use("/watchlist", watchlistRouter);

const SECRET = "secret";
const USER_ID = "507f1f77bcf86cd799439011";
const MOVIE_ID = "507f1f77bcf86cd799439022";
const makeToken = (userId: string) => jwt.sign({ userId, role: "user" }, SECRET, { expiresIn: "1h" });
const validToken = makeToken(USER_ID);
const MockWatchlist = Watchlist as jest.Mocked<typeof Watchlist>;

beforeEach(() => { jest.clearAllMocks(); });

describe("GET /watchlist", () => {
  it("returns 200 empty", async () => {
    (MockWatchlist.find as jest.Mock).mockReturnValue({ populate: jest.fn().mockResolvedValue([]) });
    const res = await request(app).get("/watchlist").set("Authorization", `Bearer ${validToken}`);
    expect(res.status).toBe(200);
  });
  it("returns 401 no token", async () => {
    const res = await request(app).get("/watchlist");
    expect(res.status).toBe(401);
  });
});

describe("POST /watchlist", () => {
  it("returns 201 on add", async () => {
    (MockWatchlist.create as jest.Mock).mockResolvedValue({ _id: "x", userId: USER_ID, movieId: MOVIE_ID });
    const res = await request(app).post("/watchlist").set("Authorization", `Bearer ${validToken}`).send({ movieId: MOVIE_ID });
    expect(res.status).toBe(201);
  });
  it("returns 400 missing movieId", async () => {
    const res = await request(app).post("/watchlist").set("Authorization", `Bearer ${validToken}`).send({});
    expect(res.status).toBe(400);
  });
  it("returns 400 duplicate", async () => {
    (MockWatchlist.create as jest.Mock).mockRejectedValue(Object.assign(new Error("dup"), { code: 11000 }));
    const res = await request(app).post("/watchlist").set("Authorization", `Bearer ${validToken}`).send({ movieId: MOVIE_ID });
    expect(res.status).toBe(400);
  });
});

describe("DELETE /watchlist/:movieId", () => {
  it("returns 200 on remove", async () => {
    (MockWatchlist.findOneAndDelete as jest.Mock).mockResolvedValue({ _id: "x" });
    const res = await request(app).delete(`/watchlist/${MOVIE_ID}`).set("Authorization", `Bearer ${validToken}`);
    expect(res.status).toBe(200);
  });
  it("returns 404 not found", async () => {
    (MockWatchlist.findOneAndDelete as jest.Mock).mockResolvedValue(null);
    const res = await request(app).delete(`/watchlist/${MOVIE_ID}`).set("Authorization", `Bearer ${validToken}`);
    expect(res.status).toBe(404);
  });
  it("returns 401 no token", async () => {
    const res = await request(app).delete(`/watchlist/${MOVIE_ID}`);
    expect(res.status).toBe(401);
  });
});
