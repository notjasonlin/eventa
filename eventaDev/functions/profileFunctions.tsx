import { Profile } from "../interfaces/profileInterface";
import { supabase } from "../lib/supabase";

export const grabProfileByID = async (id: string): Promise<Profile | null> => {
    console.log(id);
    let { data: profiles, error } = await supabase
        .from('profile')
        .select('firstName, lastName')
        .eq('id', id);

    if (error) {
        console.error("Error grabbing user profile", error);
        throw error;
    }

    console.log(profiles);

    if (profiles && profiles.length > 0) {
        return {id, ...profiles[0]};
    } else {
        return null;
    }
};