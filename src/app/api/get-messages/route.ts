import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/app/model/User"
import mongoose from "mongoose"

export async function GET() {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return Response.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      )
    }

    const userId = new mongoose.Types.ObjectId((session.user as any)._id)

    const userData = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } },
      { $sort: { "messages.createdAt": -1 } },
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$messages" },
          // ✅ FIXED field name to match schema
          isAcceptingMessage: { $first: "$isAcceptingMessage" },
        },
      },
    ])

    if (!userData || userData.length === 0) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )
    }

    return Response.json(
      {
        success: true,
        message: "Messages fetched successfully",
        messages: userData[0].messages,
        // ✅ fix key name here too
        isAcceptingMessage: userData[0].isAcceptingMessage,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Failed to fetch messages:", error)
    return Response.json(
      { success: false, message: "Failed to fetch messages" },
      { status: 500 }
    )
  }
}
