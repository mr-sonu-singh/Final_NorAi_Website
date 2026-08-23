import React from 'react';
import { Avatar } from '@/components/atoms/Avatar';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Stack } from '@/components/foundation/Stack';
import { SocialLinks } from '../SocialLinks';
import { cn } from '@/lib/utils';
import { TeamMemberCardProps } from './TeamMemberCard.types';

export function TeamMemberCardBody({
  name,
  role,
  photoSrc,
  bio,
  socials,
  className,
  ...props
}: TeamMemberCardProps) {
  return (
    <Stack
      direction="col"
      gap="4"
      align="center"
      className={cn(
        'p-6 bg-canvas-paper border border-line-subtle rounded-xl text-center w-full shadow-sm transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)] hover:shadow-hover hover:border-line-accent hover:-translate-y-0.5',
        className,
      )}
      data-testid="team-member-card-molecule"
      {...props}
    >
      <Avatar src={photoSrc} alt={name} size="lg" className="w-20 h-20" />

      <div className="space-y-1">
        <Heading as="h3" variant="heading-sm" className="font-semibold text-ink-primary">
          {name}
        </Heading>
        <Text as="p" className="text-[13px] text-terra-600 font-medium">
          {role}
        </Text>
      </div>

      {bio && (
        <Text as="p" className="text-body-xs text-ink-secondary max-w-xs leading-relaxed">
          {bio}
        </Text>
      )}

      {socials && socials.length > 0 && (
        <div className="pt-1">
          <SocialLinks links={socials} size="sm" />
        </div>
      )}
    </Stack>
  );
}

export function TeamMemberCard(props: TeamMemberCardProps) {
  return <TeamMemberCardBody {...props} />;
}
