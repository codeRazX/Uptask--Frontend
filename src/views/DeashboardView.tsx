import { Link, useSearchParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProject, getProjects } from "@/api/projectApi"
import Spinner from "@/components/Spinner"
import ProjectListItem from "@/components/projects/ProjectListItem"
import HeaderSection from "@/components/HeaderSection"
import { toast } from "react-toastify"
import { formatErrorsFrontend } from "../utils"
import useAuth from "@/hooks/useAuth"
import ConfirmDeleteProject from "@/components/projects/ConfirmDeleteProject"


export default function DeashboardView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  
  const {data: user, isLoading: loadingAuth} = useAuth()

 
  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: (error) =>
      toast.error(error.message, { className: "border border-red-500" }),
    onSuccess: (data) => {
      toast.success(data, { className: "border border-lime-400" });
      queryClient.invalidateQueries({ queryKey: [`projects`] });
      setSearchParams({}, {replace: true})
    },
  });

  const handleDeleteProject = () => {
    const projectId = searchParams.get("projectId");
    if (!projectId) return;
    mutate(projectId);
  };

  return (
    <>
      <HeaderSection
        title="My Projects"
        subtitle="Manage and administer your projects"
        linkValue="New Project"
        linkPath="/projects/create"
      />
      {isError && (
        <p className="text-red-600 font-bold mt-20 text-center">
          {formatErrorsFrontend(error)}
        </p>
      )}
      {!isError &&
        (isLoading || loadingAuth ? (
          <Spinner />
        ) : data && user && data.length ? (
          <>
            <ul className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
              {data.map((project) => (
                <ProjectListItem key={project._id} project={project} user={user._id} />
              ))}
            </ul>
            <ConfirmDeleteProject  handleDeleteProject={handleDeleteProject} />
          </>
        ) : (
          <p className="text-center py-20">
            No projects yet{" "}
            <Link
              to={"/projects/create"}
              className="text-fuchsia-500 font-bold"
            >
              Create Project
            </Link>
          </p>
        ))}
    </>
  );
}
