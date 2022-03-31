import React, { FC } from 'react';
import { withStyles } from '@mui/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

interface IPanelAccordionProps {
  title: string,
  id: string,
  disabled?: boolean,
  component: React.ReactNode
}
interface IAccordionsProps {
  children: Array<IPanelAccordionProps>,
  onChange?: (panel: string | boolean) => string | boolean;
  expanedDefault?: string | boolean;
  openMultiple?: boolean;
  loading?: boolean;
}
const AccordionsComponent: FC<IAccordionsProps & AccordionProps> = function (props) {
  const { children,
    onChange,
    expanedDefault = false,
    openMultiple = false,
    loading,
    ...others
  } = props;
  const [expanded, setExpanded] = React.useState<string | boolean>(expanedDefault);
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
    onChange && onChange(newExpanded);
  };
  return (
    <div>
      {children.map((acco: IPanelAccordionProps) =>
        <Accordion {...others} disabled={loading || acco.disabled} key={acco.id} square expanded={!openMultiple ? (expanded === acco.id) : undefined} onChange={handleChange(acco.id)}>
          <AccordionSummary aria-controls={acco.id} id={acco.id}>
            <Typography>{acco.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {acco.component}
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}
export default AccordionsComponent
