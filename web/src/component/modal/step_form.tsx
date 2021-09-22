import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  left: {
    flex: 0,
  },
  right: {
    marginLeft: 16,
    flex: 1,
  },
  steps: {
    borderRadius: 4,
    width: 300,
  },
  button: {
    marginTop: 8,
    marginRight: 8,
  },
  resetContainer: {
    paddingLeft: 24,
    paddingBottom: 24,
  },
})

export default (props: { children: any; steps: { name: string; description: string }[]; step: number; canNext: boolean; onChange: (step: number) => void }) => {
  const classes = useStyles()

  const handleNext = () => {
    props.onChange(props.step + 1)
  }

  const handleBack = () => {
    props.onChange(props.step - 1)
  }

  const handleReset = () => {
    props.onChange(0)
  }

  return (
    <Box className={classes.root}>
      <Paper className={classes.left} elevation={3}>
        <Stepper className={classes.steps} activeStep={props.step} orientation="vertical">
          {props.steps.map((step, index) => (
            <Step key={step.name}>
              <StepLabel>
                <Typography>{step.name}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body2">{step.description}</Typography>
                <div>
                  <Button disabled={props.step === 0} onClick={handleBack} className={classes.button}>
                    返回
                  </Button>
                  <Button disabled={!props.canNext} variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                    {props.step === props.steps.length - 1 ? '完成' : '下一步'}
                  </Button>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {props.step === props.steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Button variant="contained" color="info" onClick={handleReset} className={classes.button}>
              重新开始
            </Button>
          </Paper>
        )}
      </Paper>
      <Box className={classes.right}>{props.children}</Box>
    </Box>
  )
}
