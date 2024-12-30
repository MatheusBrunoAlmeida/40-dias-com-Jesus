-- CreateTable
CREATE TABLE "DaysRead" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DaysRead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DaysRead" ADD CONSTRAINT "DaysRead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
