import { Student } from "./base";

export async function googleSignUp({ email, name }: { email: string, name: string }) {
    const response = await (await fetch(Student.RegisterEndpoint, {
        method: "POST",
        headers: {
            "Authorization": process.env.API_AUTHORIZATION!
        },
        body: JSON.stringify({
            "fullname": name,
            "username": name,
            "email": email
        })
    })).json();

    return response;
}