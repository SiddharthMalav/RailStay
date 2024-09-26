/**
 * Base controller class managing database connections and data parsing.
 * Ensures database connection is re-established if not already connected.
 */

import { Mongo } from "@/config/db-connection";
import { isAuthLogin } from "@/utils";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

export class IndexController {
  constructor() {
    this.reInitializeDBConnection();
    const isAuthUserLogin = isAuthLogin();
    if (!isAuthUserLogin) {
      redirect("/sign-in");
    }
  }
  async reInitializeDBConnection(): Promise<void> {
    try {
      if (!mongoose.connection.readyState) {
        const mongo = new Mongo();
        await mongo.connect();
      }
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }

  parse(data: any): any {
    return JSON.parse(JSON.stringify(data));
  }
}
