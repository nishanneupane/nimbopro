import { OrganizationList } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const CreateOrganizationPage = () => {
    return (
        <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl={"/organization/:id"}
            afterCreateOrganizationUrl={"/organization/:id"}
            appearance={{
                baseTheme:dark
            }}
        />
    )
}

export default CreateOrganizationPage