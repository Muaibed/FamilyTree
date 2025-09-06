import { Client } from "@upstash/qstash";

export const qstash = new Client(
    {
  token: process.env.QSTASH_TOKEN!,
    // token: "eyJVc2VySUQiOiJkNGY5ZDk2Zi04MGZjLTRiOTItYWJlZi1jZDdlNDE5ZGUwODEiLCJQYXNzd29yZCI6ImE3YzBiNDJhNGJiZDRhNmY4NjIyZDVlMDdmNjc4MWJkIn0="
}
);