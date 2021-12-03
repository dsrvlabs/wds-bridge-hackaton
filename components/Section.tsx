import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import { SectionProps } from './types';

export interface SectionProps {
  className?: string;
  children?: JSX.Element;
  narrow?: boolean;
  fullWidth?: boolean;
  disablePadding?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const StyledBox = styled(Box)((props: SectionProps) => {
  return {
    width: props.theme.layout.fullWidth,
    margin: props.theme.layout.middle,
    marginTop: props.theme.spacing(15), // TODO
    padding: props.disablePadding ? 0 : props.theme.spacing(6, 2),
    [props.theme.breakpoints.up('sm')]: {
      padding: props.theme.spacing(8, 8),
    },
    [props.theme.breakpoints.up('md')]: {
      padding: props.theme.spacing(12, 8),
    },
    // eslint-disable-next-line no-nested-ternary
    maxWidth: props.fullWidth ? '100%' : props.narrow ? 800 : 1236, // props.theme.layout.contentWidth,
  };
});

const Section = ({ children, className, ...rest }: SectionProps): JSX.Element => {
  return (
    <StyledBox className={clsx('section', className)} {...rest}>
      {children}
    </StyledBox>
  );
};

export default Section;
