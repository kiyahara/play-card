import Manage from "./Manage";

interface ContainerProductTabs {
  setLoading: (_value: boolean) => void;
}

const Container = ({ setLoading }: ContainerProductTabs) => {
  return <Manage setLoading={setLoading} />;
};

export default Container;
