# Top-level directory layout

```jsx
├── components                          # Elements for pages
├── data                                # External Resources
├── docs                                # Dev documentation
├── layout                              # Frames for pages
├── pages                               # Pages
├── public                              # Static files
├── styles                              # Style files
└── theme                               # Theme-related files
```

# Directories

## components

```jsx
.
├── ...
├── components
│   ├── theFront                        # Multipurpose templates
│   └── DOMAIN_DIRECTORIES              # Domain directories
└── ...
```

## data

```jsx
.
├── ...
├── data
│   └── chaininfo
│        ├── chain-infos.ts             # ChainInfo
│        ├── chain-list-infos.ts        # ChainListInfo
│        ├── config.ts                  # Explorer, DefaultFee, APR etc.
│        └── stake-infos.ts             # StakeInfo
├── types.ts
├── DOMAIN_DIRECTORIES
└── ...
```

## docs

```jsx
.
├── ...
├── docs
│   └── README.md                       # Directory overview
└── ...
```

## layout

```jsx
.
├── ...
├── layout
│   ├── header                          # Header-related files
│   └── footer                          # Footer-related files
└── ...
```

## pages

```jsx
.
├── ...
├── pages
│   └── api
│        ├── balance                    # Balance
│        ├── calculator                 # Staking information
│        ├── epoch                      # Epoch information
│        ├── price                      # Price information
│        ├── stake                      # Staking balance
│        └── staking-status             # Staking status information
├── _app.tsx
├── _document.tsx
├── index.tsx
├── DOMAIN_DIRECTORIES
└── ...
```
