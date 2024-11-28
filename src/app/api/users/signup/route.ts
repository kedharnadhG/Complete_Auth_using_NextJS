import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcryptjs";
// var bcryptjs = require('bcryptjs');

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // console.log(reqBody);
    const { username, email, password } = reqBody;

    // do validation here (own)

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
