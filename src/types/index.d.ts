interface DefaultProps {
  children?: React.ReactNode;
}

interface MoA {
  id: string;
  name?: string;
  url?: string;
  thumb?: string;
  title?: string;
  desc?: string;
}

type MoAListType = "card" | "list";

interface MoAItemProps {
  moa: MoA;
  listType: MoAListType;
}
interface MoAMobileItemProps {
  moa: MoA;
}
interface IFormInputs {
  name: string;
  url: string;
  thumb?: string;
  title?: string;
  desc?: string;
}
interface SearchComponentProps {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}
interface KeywordSearchForm {
  keyword: string;
}
