# Sveltekit Cloudflare Ai Web Api Demo

This is a set of examples for creating your own Ai assistant directly in your browser.

Currently included Ai tools you will find running this project:

- text to image (Stable Diffusion XL)
- chat (Llama)

You should have a [Cloudflare](https://dash.cloudflare.com/sign-up) account to generate a "CF_API_TOKEN" and retrieve your "CF_USER_ID".

[Here](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) is a guide for api token creation.

[This](https://developers.cloudflare.com/workers-ai/get-started/rest-api/#get-started---workers-ai-api) is for a deep dive into Cloudflare's Workers docs.

## How to use

To run this project simply clone it to your device.

Then rename ".env.example" to ".env" and fullfill it with your fresh Cloudflare data.

Run

```bash
# to install dependencies
pnpm install

# to run the project
pnpm run dev

# to build it
pnpm run build
```
