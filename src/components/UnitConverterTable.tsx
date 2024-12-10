import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  allUnits
} from '../constants/units';

import {
  conversionMap,
  areAllNonNullValues,
  isNumberOrDecimal
} from '../utils/conversions';

type RowEntry = {
  id: string;
  inputNumericalValue: string|null;
  inputUnitOfMeasure: string|null;
  targetUnitOfMeasure: string|null;
  studentResponse: string|null;
};

const dataKeys = ['inputUnitOfMeasure', 'targetUnitOfMeasure', 'inputNumericalValue', 'studentResponse'];

const areUnitsValid = (unitA: string, unitB: string): boolean => {
  const subMap = conversionMap[unitA];
  return unitB in subMap;
};

const getConversionFunction = (unitA: string, unitB: string) => {
  const nestedMap = conversionMap[unitA];
  return nestedMap[unitB];
};

const UnitConverterTable = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const [data, setData] = useState<RowEntry[]>([{
    id: crypto.randomUUID(),
    inputNumericalValue: null,
    inputUnitOfMeasure: null,
    targetUnitOfMeasure: null,
    studentResponse: null
  }]);
  
  const columns = useMemo<MRT_ColumnDef<RowEntry>[]>(
    () => [
      {
        accessorKey: 'inputNumericalValue',
        header: 'Input Numerical Value',
        muiEditTextFieldProps: ({row, cell}) => ({
          type: 'text',
          required: true,
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onBlur: (e) => {
            const { value } = e.target;
            const error = isNumberOrDecimal(value) ? undefined : 'Invalid'; 
            setValidationErrors(errors => (
              {
                ...errors,
                [cell.id]: error
              }
            ));

            setData(data => {
              const newData = [...data];
              newData[row.index] = {...row.original, 'inputNumericalValue': value};
              return newData;
            });
          }
        })
      },
      {
        accessorKey: 'inputUnitOfMeasure',
        header: 'Input Unit of Measure',
        editVariant: 'select',
        editSelectOptions: allUnits,
        muiEditTextFieldProps: ({row}) => ({
          required: true,
          error: false,
          onChange: (e) =>
            setData(data => {
              const newData = [...data];
              newData[row.index] = {...row.original, 'inputUnitOfMeasure': e?.target?.value};
              return newData;
            })
        })
      },
      {
        accessorKey: 'targetUnitOfMeasure',
        header: 'Target Unit of Measure',
        editVariant: 'select',
        editSelectOptions: allUnits,
        muiEditTextFieldProps: ({row}) => ({
          required: true,
          error: false,
          onChange: (e) =>
            setData(data => {
              const newData = [...data];
              newData[row.index] = {...row.original, 'targetUnitOfMeasure': e?.target?.value};
              return newData;
            })
        })
      },
      {
        accessorKey: 'studentResponse',
        header: 'Student Response',
        muiEditTextFieldProps: ({row, cell}) => ({
          type: 'text',
          required: true,
          error: !!validationErrors[cell.id],
          helperText: validationErrors[cell.id],
          onBlur: (e) => {
            const { value } = e.target;
            const error = isNumberOrDecimal(value) ? undefined : 'Invalid'; 
            setValidationErrors(errors => (
              {
                ...errors,
                [cell.id]: error
              }
            ));
            setData(data => {
              const newData = [...data];
              newData[row.index] = {...row.original, 'studentResponse': value};
              return newData;
            });
          }
        })
      },
      {
        accessorKey: 'output',
        header: 'Output',
        enableEditing: false,
        Cell: ({row}) => {
          const { original: data } = row;

          if (!areAllNonNullValues(data, dataKeys)) {
            return '';
          }

          const { inputUnitOfMeasure, targetUnitOfMeasure, inputNumericalValue, studentResponse} = data;

          if (inputUnitOfMeasure === targetUnitOfMeasure) {
            return inputNumericalValue;
          }

          if (!areUnitsValid(inputUnitOfMeasure as string, targetUnitOfMeasure as string)) {
            return 'Invalid';
          };

          const conversionFunction = getConversionFunction(inputUnitOfMeasure as string, targetUnitOfMeasure as string);
          const correctAnswer = conversionFunction(Number(inputNumericalValue));
          const correctAnswerToNearestTenths = Number(correctAnswer.toFixed(1));
          const studentResponseToNearestTenths = Number(Number(studentResponse).toFixed(1));
          console.log('Correct Answer', correctAnswerToNearestTenths);
          return (correctAnswerToNearestTenths === studentResponseToNearestTenths) && 'Correct' || 'Incorrect';
        }
      }
    ], [validationErrors]
  );

  const table = useMaterialReactTable({
    columns,
    data: data,
    createDisplayMode: 'row',
    editDisplayMode: 'table',
    enableEditing: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableBottomToolbar: true,
    enableTopToolbar: false,
    getRowId: (row) => row.id,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              const { id } = row.original;
              setData(data => data.filter(row => row.id !==id));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderBottomToolbarCustomActions: () => (
      <Button
        variant="contained"
        onClick={() => setData(data => [
            ...data,
            {
              id: crypto.randomUUID(),
              inputNumericalValue: null,
              inputUnitOfMeasure: null,
              targetUnitOfMeasure: null,
              studentResponse: null
            }
          ]
        )}
      >
        Add New Row
      </Button>
    ),
    state: {}
  });
  return <MaterialReactTable table={table} />;
};

export default UnitConverterTable;
