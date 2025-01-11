/** @type {import('next').NextConfig} */
const nextConfig = {};

if (process.env.NEXT_PUBLIC_TEMPO) {
    nextConfig["experimental"] = {
      // NextJS 13.4.8 up to 14.1.3:
      swcPlugins: [[require.resolve("tempo-devtools/swc/0.86"), {}]]
    }
  }

export default nextConfig;
