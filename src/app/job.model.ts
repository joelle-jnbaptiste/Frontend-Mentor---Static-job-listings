import { Tool } from "./tool.enum";
import { Language } from "./language.enum";
import { Level } from "./level.enum";
import { Role } from "./role.model";

export class Job implements Deserializable {

    id: number | undefined;
    company: string | undefined;
    logo: string | undefined;
    new: boolean | undefined;
    featured: boolean | undefined;
    position: string | undefined;
    role: Role | undefined;
    level: Level | undefined;
    postedAt: string | undefined;
    contract: string | undefined;
    location: string | undefined;
    languages: Array<Language> | undefined;
    tools: Array<Tool> | undefined;

    deserialize(input: any) {
        Object.assign(this, input);

        let letRoleString = this.role;
        let typedRoleString = letRoleString as keyof typeof Role;
        this.role = Role[typedRoleString];

        let letLevelString = this.level;
        let typedLevelString = letLevelString as keyof typeof Level;
        this.level = Level[typedLevelString];

        let newLang: Language[] = new Array();
        this.languages?.forEach(lang => {
            let letLanguageString = lang;
            let typedLanguageString = letLanguageString as unknown as keyof typeof Language;
            newLang.push(Language[typedLanguageString])
        });

        this.languages = newLang;

        let newTools: Tool[] = new Array();
        this.tools?.forEach(tool => {
            let letToolString = tool;
            let typedToolString = letToolString as unknown as keyof typeof Tool;
            newTools.push(Tool[typedToolString])
        });

        this.tools = newTools;

        return this;
    }
}


export interface Deserializable {
    deserialize(input: any): this;
}