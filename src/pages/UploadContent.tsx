
import DashboardLayout from '@/components/layout/DashboardLayout';
import UploadForm from '@/components/content/UploadForm';

const UploadContent = () => {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Upload Content</h1>
          <p className="text-muted-foreground mt-1">
            Share educational materials with your students
          </p>
        </div>
        
        <UploadForm />
      </div>
    </DashboardLayout>
  );
};

export default UploadContent;
