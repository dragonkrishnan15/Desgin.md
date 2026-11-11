import React from 'react';
import { WorkspaceDashboard } from './WorkspaceDashboard';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { StoryPresentation } from './StoryPresentation';
import { ScrollStory } from './ScrollStory';
import { LaunchPage } from './LaunchPage';
import { BentoFeatures } from './BentoFeatures';
import { RestaurantHome } from './RestaurantHome';
import { LawFirmHome } from './LawFirmHome';
import { Specimen } from '@/components/Specimen';

interface BlueprintRendererProps {
  blueprintId: string | null;
  compact?: boolean;
}

export const BlueprintRenderer: React.FC<BlueprintRendererProps> = ({
  blueprintId,
  compact = false,
}) => {
  switch (blueprintId) {
    case 'workspace-dashboard':
      return <WorkspaceDashboard compact={compact} />;
    case 'analytics-dashboard':
      return <AnalyticsDashboard compact={compact} />;
    case 'story-presentation':
      return <StoryPresentation compact={compact} />;
    case 'scroll-story':
      return <ScrollStory compact={compact} />;
    case 'launch-page':
      return <LaunchPage compact={compact} />;
    case 'bento-features':
      return <BentoFeatures compact={compact} />;
    case 'osteria-lume':
      return <RestaurantHome compact={compact} />;
    case 'law-firm':
      return <LawFirmHome compact={compact} />;
    default:
      return <Specimen compact={compact} />;
  }
};

