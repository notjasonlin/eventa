import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";

export const grabEmail = () => {
    const [fetchError, setFetchError] = useState<boolean | null>(null);
    const [email, setEmail] = useState("");

    useEffect(() => {
        console.log("Entered");
        const Fetch = async () => {
            const { data: email, error } = await supabase.from("profile").select("email");

            if (error) {
                setFetchError(true);
                // console.log("Error fetching email");
            } else {
                if (email && email.length > 0) {
                    setEmail(email[0].email);
                }
                setFetchError(false);
                // console.log("Email fetched successfully");
            }
            // console.log(email);
        };

        Fetch();
    }, []);

    if (fetchError) {
        return null;
    }
    return email;
}