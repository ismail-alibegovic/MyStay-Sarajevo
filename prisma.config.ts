import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  seed: {
    command: 'tsx prisma/seed.ts',
  },
})
