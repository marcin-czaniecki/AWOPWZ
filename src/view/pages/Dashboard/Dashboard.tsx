import { useToast } from "hooks/useToast";

const Dashboard = () => {
  const { setToast } = useToast();
  return (
    <div>
      <h3>Dashboard</h3>
      <button
        type="button"
        onClick={() => {
          setToast("coś");
        }}
      ></button>
    </div>
  );
};
export default Dashboard;
