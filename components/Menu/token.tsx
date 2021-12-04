import React from 'react';
import { MenuItem, Select, Avatar, ListItemIcon, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const SelectBox = styled(Select)(() => {
  return {
    appearance: 'none',
    borderRadius: 27,
  };
});

const StyledAvatar = styled(Avatar)(({ theme }) => {
  return {
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginRight: theme.spacing(1),
  };
});

export interface Token {
  name: string;
  address: string;
}

interface Props {
  token: Token | null;
  tokens: Token[];
  label: string;
  onSelectToken: (item: Token) => void;
  // setData: (key: string) => void;
  disabled: boolean;
}

export default function Menu({
  token,
  tokens,
  label,
  onSelectToken,
  disabled,
}: Props): JSX.Element {
  const drawItem = (item: Token): JSX.Element => {
    let icon = '/ethereum.png';

    switch (item.address) {
      case 'evmos':
        icon = '/evmos.png';
        break;
      default:
        break;
    }

    return (
      <>
        <ListItemIcon>
          <StyledAvatar src={icon} />
        </ListItemIcon>
        {item.name}
      </>
    );
  };

  return (
    <FormControl variant="outlined" sx={{ minWidth: 1 }} placeholder="Select Network">
      <InputLabel>{label}</InputLabel>
      <SelectBox
        disabled={disabled}
        label={label}
        style={{ backgroundColor: '#9FBFFF26' }}
        value={token ? `${token.name}:${token.address}` : ''}
        onChange={(e): void => {
          const temp = e.target.value as string;
          onSelectToken({
            name: temp.split(':')[0],
            address: temp.split(':')[1],
          });
        }}
      >
        {tokens.map((item, i) => {
          return (
            <MenuItem key={i} value={`${item.name}:${item.address}`}>
              {drawItem(item)}
            </MenuItem>
          );
        })}
      </SelectBox>
    </FormControl>
  );
}
