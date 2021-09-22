import React, { useState, useRef, useEffect, useCallback } from 'react'
import { makeStyles } from '@mui/styles'
import LinkSelect from '../input/link_select'
import NullContainer from '../input/null_container'
import RenderItem from '../render/render_item'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import ArrayInput from '../input/array_input'
import { Column, InputProps, Model, QueryModel } from '../../index'

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    paddingLeft: 14,
    paddingRight: 20,
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
  },
  group: {
    flexDirection: 'row',
  },
})

const renderBool = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<Q>) => {
  const C = (props: InputProps<Q>) => {
    const classes = useStyles()

    return (
      <FormControl className={classes.root} fullWidth>
        <FormLabel className={classes.label}>{param.label}</FormLabel>
        <RadioGroup
          className={classes.group}
          name={param.name}
          defaultValue={props.default?.[param.name] == null ? 'null' : props.default[param.name]?.toString()}
          onChange={(e) => props.onChange?.(param.name, e.currentTarget.value == 'null' ? null : e.currentTarget.value == 'true')}
        >
          <FormControlLabel value={'true'} control={<Radio />} label={param.name == 'sex' || param.name == 'gender' ? '男' : '✔'} />
          <FormControlLabel value={'false'} control={<Radio />} label={param.name == 'sex' || param.name == 'gender' ? '女' : '✖'} />
          {param.nullable && <FormControlLabel value={'null'} control={<Radio />} label="未知" />}
        </RadioGroup>
      </FormControl>
    )
  }
  return (
    <Grid key={param.name} item xs={3}>
      <C {...props} />
    </Grid>
  )
}

const renderString = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<Q>) => {
  const C = (props: InputProps<Q>) => {
    const [value, setValue] = useState(props.default?.[param.name])
    const [origin, setOrigin] = useState(props.default?.[param.name] === null ? undefined : props.default?.[param.name])
    const onChange = useCallback((e: any) => {
      setValue(e.target.value)
      props.onChange(param.name, e.target.value)
    }, [])

    return param.map ? (
      <FormControl variant="outlined" fullWidth>
        <InputLabel>{param.label}</InputLabel>
        <NullContainer
          small={true}
          nullable={param.nullable}
          disabled={value === null}
          setDisabled={(v: boolean) => {
            if (v) setOrigin(value)
            setValue(v ? null : origin)
          }}
        >
          <Select multiple={param.search === 'in'} label={param.label} defaultValue={props.default?.[param.name]} disabled={value === null} onChange={onChange}>
            {Object.keys(param.map).map((key) => (
              <MenuItem key={key} value={param.map?.[key]}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </NullContainer>
      </FormControl>
    ) : (
      <NullContainer
        small={true}
        nullable={param.nullable}
        disabled={value === null}
        setDisabled={(v: boolean) => {
          if (v) setOrigin(value)
          setValue(v ? null : origin)
        }}
      >
        {param.search === 'in' ? (
          <ArrayInput label={param.label} defaultValue={props.default?.[param.name]} disabled={value === null} onChange={onChange} />
        ) : (
          <TextField size="small" fullWidth variant="outlined" label={param.label} defaultValue={props.default?.[param.name]} disabled={value === null} onChange={onChange} />
        )}
      </NullContainer>
    )
  }
  return (
    <Grid key={param.name} item xs={2}>
      <C {...props} />
    </Grid>
  )
}

const renderInt = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<Q>) => {
  const C = (props: InputProps<Q>) => {
    const [value, setValue] = useState(props.default?.[param.name])
    const [origin, setOrigin] = useState(props.default?.[param.name] === null ? undefined : props.default?.[param.name])
    const onChange = useCallback((e: any) => {
      setValue(e.target.value)
      props.onChange(param.name, e.target.value)
    }, [])

    return (
      <NullContainer
        small={true}
        nullable={param.nullable}
        disabled={value === null}
        setDisabled={(v: boolean) => {
          if (v) setOrigin(value)
          setValue(v ? null : origin)
        }}
      >
        {param.search === 'between' ? (
          <RenderItem.NumberBetween size="small" label={param.label} disabled={value === null} onChange={onChange} />
        ) : (
          <TextField fullWidth size="small" type="number" variant="outlined" label={param.label} disabled={value === null} onChange={onChange} />
        )}
      </NullContainer>
    )
  }
  return (
    <Grid key={param.name} item xs={param.search === 'between' ? 3 : 2}>
      <C {...props} />
    </Grid>
  )
}

const renderFloat = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<Q>) => {
  const C = (props: InputProps<Q>) => {
    const [value, setValue] = useState(props.default?.[param.name])
    const [origin, setOrigin] = useState(props.default?.[param.name] === null ? undefined : props.default?.[param.name])
    const onChange = useCallback((e: any) => {
      setValue(e.target.value)
      props.onChange(param.name, e.target.value)
    }, [])

    return (
      <NullContainer
        small={true}
        nullable={param.nullable}
        disabled={value === null}
        setDisabled={(v: boolean) => {
          if (v) setOrigin(value)
          setValue(v ? null : origin)
        }}
      >
        {param.search === 'between' ? (
          <RenderItem.NumberBetween size="small" label={param.label} disabled={value === null} onChange={onChange} />
        ) : (
          <TextField fullWidth size="small" type="number" variant="outlined" label={param.label} disabled={value === null} onChange={onChange} />
        )}
      </NullContainer>
    )
  }
  return (
    <Grid key={param.name} item xs={param.search === 'between' ? 3 : 2}>
      <C {...props} />
    </Grid>
  )
}

const renderModel = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<T>) => {
  const C = (props: InputProps<T>) => {
    const [value, setValue] = useState(props.default?.[param.name])
    const [origin, setOrigin] = useState(props.default?.[param.name] === null ? undefined : props.default?.[param.name])
    const onChange = useCallback((e: any) => {
      setValue(e.target.value)
      props.onChange(param.name, e.target.value)
    }, [])

    return (
      <NullContainer
        small={true}
        nullable={param.nullable}
        disabled={value === null}
        setDisabled={(v: boolean) => {
          if (v) setOrigin(value)
          setValue(v ? null : origin)
        }}
      >
        {!param.link ? (
          <TextField fullWidth variant="outlined" label={param.label} defaultValue={props.default?.[param.name]} disabled={value === null} onChange={onChange} />
        ) : (
          <LinkSelect label={param.label} link={param.link} defaultValue={props.default?.[param.name + 'Data']} disabled={value === null} onChange={onChange} />
        )}
      </NullContainer>
    )
  }
  return (
    <Grid key={param.name} item xs={3}>
      <C {...props} />
    </Grid>
  )
}

const renderStringArray = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<Q>) => {
  const C = (props: InputProps<Q>) => {
    const [value, setValue] = useState(props.default?.[param.name])
    const [origin, setOrigin] = useState(props.default?.[param.name] === null ? undefined : props.default?.[param.name])
    const onChange = useCallback((e: any) => {
      setValue(e.target.value)
      props.onChange(param.name, e.target.value)
    }, [])

    return param.map ? (
      <FormControl size="small" variant="outlined" fullWidth>
        <InputLabel>{param.label}</InputLabel>
        <NullContainer
          small={true}
          nullable={param.nullable}
          disabled={value === null}
          setDisabled={(v: boolean) => {
            if (v) setOrigin(value)
            setValue(v ? null : origin)
          }}
        >
          <Select multiple={param.search === 'in'} label={param.label} defaultValue={props.default?.[param.name]} disabled={value === null} onChange={onChange}>
            {Object.keys(param.map).map((key) => (
              <MenuItem key={key} value={param.map?.[key]}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </NullContainer>
      </FormControl>
    ) : (
      <NullContainer
        small={true}
        nullable={param.nullable}
        disabled={value === null}
        setDisabled={(v: boolean) => {
          if (v) setOrigin(value)
          setValue(v ? null : origin)
        }}
      >
        {param.search === 'in' ? (
          <ArrayInput size="small" label={param.label} defaultValue={props.default?.[param.name]} disabled={value === null} onChange={onChange} />
        ) : (
          <TextField size="small" fullWidth variant="outlined" label={param.label} defaultValue={props.default?.[param.name]} disabled={value === null} onChange={onChange} />
        )}
      </NullContainer>
    )
  }
  return (
    <Grid key={param.name} item xs={2}>
      <C {...props} />
    </Grid>
  )
}

const renderIntArray = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<Q>) => {
  const C = (props: InputProps<Q>) => {
    const [value, setValue] = useState(props.default?.[param.name])
    const [origin, setOrigin] = useState(props.default?.[param.name] === null ? undefined : props.default?.[param.name])
    const onChange = useCallback((e: any) => {
      setValue(e.target.value)
      props.onChange(param.name, e.target.value)
    }, [])

    return (
      <NullContainer
        small={true}
        nullable={param.nullable}
        disabled={value === null}
        setDisabled={(v: boolean) => {
          if (v) setOrigin(value)
          setValue(v ? null : origin)
        }}
      >
        {param.search === 'between' ? (
          <RenderItem.NumberBetween size="small" label={param.label} disabled={value === null} onChange={onChange} />
        ) : (
          <TextField fullWidth size="small" type="number" variant="outlined" label={param.label} disabled={value === null} onChange={onChange} />
        )}
      </NullContainer>
    )
  }
  return (
    <Grid key={param.name} item xs={param.search === 'between' ? 3 : 2}>
      <C {...props} />
    </Grid>
  )
}

const renderFloatArray = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<Q>) => {
  const C = (props: InputProps<Q>) => {
    const [value, setValue] = useState(props.default?.[param.name])
    const [origin, setOrigin] = useState(props.default?.[param.name] === null ? undefined : props.default?.[param.name])
    const onChange = useCallback((e: any) => {
      setValue(e.target.value)
      props.onChange(param.name, e.target.value)
    }, [])

    return (
      <NullContainer
        small={true}
        nullable={param.nullable}
        disabled={value === null}
        setDisabled={(v: boolean) => {
          if (v) setOrigin(value)
          setValue(v ? null : origin)
        }}
      >
        {param.search === 'between' ? (
          <RenderItem.NumberBetween size="small" label={param.label} disabled={value === null} onChange={onChange} />
        ) : (
          <TextField fullWidth size="small" type="number" variant="outlined" label={param.label} disabled={value === null} onChange={onChange} />
        )}
      </NullContainer>
    )
  }
  return (
    <Grid key={param.name} item xs={param.search === 'between' ? 3 : 2}>
      <C {...props} />
    </Grid>
  )
}

const renderModelArray = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<Q>) => {
  const C = (props: InputProps<Q>) => {
    const [value, setValue] = useState(props.default?.[param.name])
    const [origin, setOrigin] = useState(props.default?.[param.name] === null ? undefined : props.default?.[param.name])
    const onChange = useCallback((e: any) => {
      setValue(e.target.value)
      props.onChange(param.name, e.target.value)
    }, [])

    return (
      <NullContainer
        small={true}
        nullable={param.nullable}
        disabled={value === null}
        setDisabled={(v: boolean) => {
          if (v) setOrigin(value)
          setValue(v ? null : origin)
        }}
      >
        {!param.link ? (
          <TextField size="small" fullWidth variant="outlined" label={param.label} defaultValue={props.default?.[param.name]} disabled={value === null} onChange={onChange} />
        ) : (
          <LinkSelect size="small" label={param.label} link={param.link} defaultValue={props.default?.[param.name + 'Data']} disabled={value === null} onChange={onChange} />
        )}
      </NullContainer>
    )
  }
  return (
    <Grid key={param.name} item xs={3}>
      <C {...props} />
    </Grid>
  )
}

const renderStringMap = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<Q>) => {
  const C = (props: InputProps<Q>) => {
    const [value, setValue] = useState(props.default?.[param.name])
    const [origin, setOrigin] = useState(props.default?.[param.name] === null ? undefined : props.default?.[param.name])
    const onChange = useCallback((e: any) => {
      setValue(e.target.value)
      props.onChange(param.name, e.target.value)
    }, [])

    return (
      <NullContainer
        small={true}
        nullable={param.nullable}
        disabled={value === null}
        setDisabled={(v: boolean) => {
          if (v) setOrigin(value)
          setValue(v ? null : origin)
        }}
      >
        <RenderItem.StringPair size="small" label={param.label} disabled={value === null} onChange={onChange} />
      </NullContainer>
    )
  }
  return (
    <Grid key={param.name} item xs={3}>
      <C {...props} />
    </Grid>
  )
}

const renderStringArrayMap = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<Q>) => {
  const C = (props: InputProps<Q>) => {
    const [value, setValue] = useState(props.default?.[param.name])
    const [origin, setOrigin] = useState(props.default?.[param.name] === null ? undefined : props.default?.[param.name])
    const onChange = useCallback((e: any) => {
      setValue(e.target.value)
      props.onChange(param.name, e.target.value)
    }, [])

    return (
      <NullContainer
        small={true}
        nullable={param.nullable}
        disabled={value === null}
        setDisabled={(v: boolean) => {
          if (v) setOrigin(value)
          setValue(v ? null : origin)
        }}
      >
        <RenderItem.StringPair size="small" label={param.label} disabled={value === null} onChange={onChange} />
      </NullContainer>
    )
  }
  return (
    <Grid key={param.name} item xs={3}>
      <C {...props} />
    </Grid>
  )
}

const renderIntMap = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<Q>) => {
  const C = (props: InputProps<Q>) => {
    const [value, setValue] = useState(props.default?.[param.name])
    const [origin, setOrigin] = useState(props.default?.[param.name] === null ? undefined : props.default?.[param.name])
    const onChange = useCallback((e: any) => {
      setValue(e.target.value)
      props.onChange(param.name, e.target.value)
    }, [])

    return (
      <NullContainer
        small={true}
        nullable={param.nullable}
        disabled={value === null}
        setDisabled={(v: boolean) => {
          if (v) setOrigin(value)
          setValue(v ? null : origin)
        }}
      >
        <RenderItem.NumberPair size="small" label={param.label} disabled={value === null} onChange={onChange} />
      </NullContainer>
    )
  }
  return (
    <Grid key={param.name} item xs={3}>
      <C {...props} />
    </Grid>
  )
}

const renderFloatMap = <T extends Model, Q extends QueryModel>(param: Column<T, Q>, props: InputProps<Q>) => {
  const C = (props: InputProps<Q>) => {
    const [value, setValue] = useState(props.default?.[param.name])
    const [origin, setOrigin] = useState(props.default?.[param.name] === null ? undefined : props.default?.[param.name])
    const onChange = useCallback((e: any) => {
      setValue(e.target.value)
      props.onChange(param.name, e.target.value)
    }, [])

    return (
      <NullContainer
        small={true}
        nullable={param.nullable}
        disabled={value === null}
        setDisabled={(v: boolean) => {
          if (v) setOrigin(value)
          setValue(v ? null : origin)
        }}
      >
        <RenderItem.NumberPair size="small" label={param.label} disabled={value === null} onChange={onChange} />
      </NullContainer>
    )
  }
  return (
    <Grid key={param.name} item xs={3}>
      <C {...props} />
    </Grid>
  )
}

export default {
  renderBool,
  renderString,
  renderInt,
  renderFloat,
  renderModel,
  renderStringArray,
  renderIntArray,
  renderFloatArray,
  renderModelArray,
  renderStringMap,
  renderStringArrayMap,
  renderIntMap,
  renderFloatMap,
}
