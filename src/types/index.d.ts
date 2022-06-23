interface MoA {
  id: string;
  name?: string;
  url?: string;
  thumb?: string;
  title?: string;
  desc?: string;
}
interface MoAItemProps {
  moa: MoA;
}
interface IFormInputs {
  name: string;
  url: string;
  thumb?: string;
  title?: string;
  desc?: string;
}
