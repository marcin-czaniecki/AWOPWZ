import { useError } from "hooks/useError";

const Dashboard = () => {
  const { setError } = useError();
  return (
    <div>
      <h3>Dashboard</h3>
      <button
        type="button"
        onClick={() => {
          setError("coś");
        }}
      ></button>
    </div>
  );
};
export default Dashboard;
