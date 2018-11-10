import { GroupPostResponseModel } from './GroupPostResponseModel';
import { SnippetResponseModel } from './SnippetResponseModel';

export class ProjectViewModel {
  Group: GroupPostResponseModel;
  Snippets: SnippetResponseModel[];
  SnippetsAmount: Number;
}
