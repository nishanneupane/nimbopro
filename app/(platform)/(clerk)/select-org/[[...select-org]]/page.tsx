import { OrganizationList } from '@clerk/nextjs'
import { clerkAppearance } from '@/lib/clerk-appearance'

const CreateOrganizationPage = () => {
    return (
        <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl={"/organization/:id"}
            afterCreateOrganizationUrl={"/organization/:id"}
            appearance={clerkAppearance}
        />
    )
}

export default CreateOrganizationPage