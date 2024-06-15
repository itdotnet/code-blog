-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "topicLimit" INTEGER NOT NULL,
    "imagePerTopicLimit" INTEGER NOT NULL,
    "features" TEXT NOT NULL
);
