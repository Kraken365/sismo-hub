import { ValueType, Tags, FetchedData } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { Group } from "../../../src/topics/group/group";
import { dataProviders } from "../../helpers/providers";

// This group is constituted by all addresses that follows masquerade.lens
// the value is 1
export default new GroupGenerator({
  generate: async (context: GeneratorContext): Promise<Group[]> => {
    const lensProvider = new dataProviders.LensProvider();
    // Masquerade.lens followers
    // https://lenster.xyz/u/masquerade.lens
    // masquerade.lens profileId: 0x328e

    const dataProfiles: FetchedData = {};
    for await (const item of lensProvider.getFollowers("0x328e")) {
      dataProfiles[item.wallet.address] = 1;
    }

    return [
      new Group({
        name: "masquerade-lens-followers",
        generationDate: new Date(context.timestamp),
        data: dataProfiles,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      }),
    ];
  },
  generationFrequency: GenerationFrequency.Weekly,
});
