import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { ProfileSkeleton } from '@shared/components/suspense/ProfileSkeleton';
import { CommonErrorFallback } from '@shared/components/CommonErrorFallback';
import { Loader } from '@shared/components/suspense/Loader';
import { GroupMemebers } from './GroupMemebers';
import { SidebarHeader } from './SidebarHeader';
import { ScheduleList } from './ScheduleList';
import { sidebarStyle, sidebarSectionStyle } from '../../styles/sidebarStyle';

export const WorkspaceSidebar = () => (
  <aside css={sidebarStyle}>
    <SidebarHeader title="Members" />
    <section css={sidebarSectionStyle}>
      <CompositionBoundaryReactQuery
        suspense={<ProfileSkeleton count={4} />}
        error={(prop) => <CommonErrorFallback {...prop} />}
      >
        <GroupMemebers />
      </CompositionBoundaryReactQuery>
    </section>
    <SidebarHeader title="TIL" />
    <section css={sidebarSectionStyle}>
      <CompositionBoundaryReactQuery
        suspense={<Loader bgColor="#ffffff" />}
        error={(prop) => <CommonErrorFallback {...prop} />}
      >
        <ScheduleList />
      </CompositionBoundaryReactQuery>
    </section>
  </aside>
);
