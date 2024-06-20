import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";

export const grabName = () => {
    const [fetchError, setFetchError] = useState<boolean | null>(null);
    const [name, setName] = useState("");

    useEffect(() => {
        console.log("Entered");
        const Fetch = async () => {
            const { data: name, error } = await supabase.from("profile").select("firstName");

            if (error) {
                setFetchError(true);
            } else {
                if (name && name.length > 0) {
                    setName(name[0].firstName);
                }
                setFetchError(false);
            }
        };

        Fetch();
    }, []);

    if (fetchError) {
        return null;
    }
    return name;
}