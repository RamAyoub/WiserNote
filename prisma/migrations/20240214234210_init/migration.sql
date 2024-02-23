-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "createBy" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "wiser_content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
