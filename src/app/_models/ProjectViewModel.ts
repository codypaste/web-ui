import { GroupPostResponseModel } from './GroupPostResponseModel';
import { SnippetResponseModel } from './SnippetResponseModel';

export class ProjectViewModel {
  group: GroupPostResponseModel;
  snippets: SnippetResponseModel[];
  snippetsAmount: Number;
}
