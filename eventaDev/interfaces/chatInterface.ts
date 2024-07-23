import { Conversation } from "./converstaionInterface";
import { Profile } from "./profileInterface";

export interface Chat {
    convo: Conversation,
    sender: Profile,
    reciever: Profile,
}