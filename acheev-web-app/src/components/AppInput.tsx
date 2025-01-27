import * as React from 'react';

import DatePicker from 'react-datepicker';
import { isString } from 'util';
import Toggle from 'react-toggle'

import 'react-datepicker/dist/react-datepicker.css';
import 'react-toggle/style.css'
import ReactAutocomplete from 'react-autocomplete';
import { ColClasses } from 'shared/Constants';

export interface AutocompleteItem { label: string; value: string }

export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
  CURRENCY = 'currency',
  DATE = 'date',
  TEXT_AREA = 'text_area',
  SELECT = 'select',
  FILE = 'file',
  CHECKBOX = 'checkbox',
  TOGGLE = 'toggle',
  LOCATION = 'location',
  IMAGE = 'image',
  PHONE = 'phone',
  AUTOCOMPLETE = 'autocomplete',
}


interface IBaseProps<T> {
  name?: string;
  placeholder?: string;
  label?: string;
  checkboxContent?: React.ReactNode;
  inputProps?: any;

  onChange?: (val: T) => any;
  onEnter?: () => any;

  value?: any;
  defaultValue?: any;

  wrapperClass?: string;
  wrapperStyle?: React.CSSProperties;

  inputClass?: string;
  inputStyle?: React.CSSProperties;

  addonItem?: React.ReactNode;
  maxlength?: number;
  accept?: string;
  customWidth?: string;

  autocompleteItems?: AutocompleteItem[];
  hideTime?: boolean;

  tiniestInputCol?: boolean;
  tinyInputCol?: boolean;
  smallInputCol?: boolean;
  medInputCol?: boolean;
  largeInputCol?: boolean;
  noPadding?: boolean;

  disabled?: boolean;
  includeRow?: boolean;
  fullWidth?: boolean;

  /**
   * A string which identifies the actual input element. This string does not necessarily have to be unique --
   * You might want to select all of the checkboxes associated with a parent element, for instance.
   */
  itestID?: string;
}

type InputText = IBaseProps<string> & { type: InputType.TEXT };
type InputAutocomplete = IBaseProps<string> & { type: InputType.AUTOCOMPLETE };
type InputTextArea = IBaseProps<string> & { type: InputType.TEXT_AREA };
type InputPassword = IBaseProps<string> & { type: InputType.PASSWORD };
type InputNumber = IBaseProps<number> & { type: InputType.NUMBER };
type InputCurrency = IBaseProps<number> & { type: InputType.CURRENCY };
type InputDate = IBaseProps<Date> & { type: InputType.DATE };
type InputFile = IBaseProps<File> & { type: InputType.FILE };
type InputImage = IBaseProps<string> & { type: InputType.IMAGE };
type InputCheckbox = IBaseProps<boolean> & { type: InputType.CHECKBOX };
type InputToggle = IBaseProps<boolean> & { type: InputType.TOGGLE };
type InputSelect = IBaseProps<number | string> & { type: InputType.SELECT };
type InputPhone = IBaseProps<string> & { type: InputType.PHONE };

type IProps = InputText | InputPassword | InputNumber | InputCurrency | InputDate | InputTextArea | InputFile | InputImage | InputCheckbox | InputToggle | InputSelect | InputPhone | InputAutocomplete;

interface IAppInputState {
  autocompleteText?: string;
  cachedValue: any;
}

export default class AppInput extends React.Component<IProps, IAppInputState> {
  constructor(props: any) {
    super(props);
    this.state = { cachedValue: props.defaultValue ?? '' }
  }

  private _handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { onEnter } = this.props;

    if (e.key === 'Enter') {
      onEnter && onEnter();
      console.log('do validate');
    }
  }

  private handleChange = (e: any) => {
    const { type, onChange, disabled } = this.props;
    const isCurrency = type === InputType.CURRENCY;

    if (onChange) {
      let cachedValue;


      if (type === InputType.FILE || type === InputType.IMAGE || type === InputType.DATE || type === InputType.PHONE ||
        type === InputType.AUTOCOMPLETE) {
        cachedValue = e;
      } else if (type === InputType.CHECKBOX || type === InputType.TOGGLE) {
        cachedValue = e.target.checked;
      } else {
        cachedValue = e.target.value;
      }

      if (type === InputType.NUMBER) {
        cachedValue = parseFloat(cachedValue);
      } else if (isCurrency) {
        cachedValue = parseFloat(cachedValue);
      }

      if (!disabled) {
        this.setState({ cachedValue });
        const callbackValue = isCurrency ? Math.trunc(cachedValue * 100) : cachedValue;
        (onChange as any)(callbackValue);
      }
    }
  }

  public render() {
    const { type, name, label, placeholder, addonItem, maxlength, inputClass, inputStyle, wrapperStyle, wrapperClass, customWidth, value, tiniestInputCol, tinyInputCol, smallInputCol, medInputCol, largeInputCol, defaultValue, noPadding, disabled, checkboxContent, includeRow, fullWidth, hideTime, inputProps, autocompleteItems } = this.props;
    const { cachedValue, autocompleteText } = this.state;

    let controlledValue = cachedValue;

    if (value !== undefined) {
      controlledValue = value;

      if (type === InputType.CURRENCY) {
        controlledValue = value / 100.0;
      }
    }

    const colClass =
      (tiniestInputCol && ColClasses.TINIEST) ||
      (tinyInputCol && ColClasses.TINY) ||
      (smallInputCol && ColClasses.SMALL) ||
      (medInputCol && ColClasses.MEDIUM) ||
      (largeInputCol && ColClasses.LARGE) || '';

    return (
      <div className={`${includeRow && 'row'} ${fullWidth && 'fullWidth'}`}>
        <div className={colClass}>
          <div className={`app-input ${noPadding ? 'no-padding' : ''} ${wrapperClass}`} style={{ padding: '3px 0', marginBottom: 15, ...wrapperStyle }}>
            {label &&
              <label style={{ marginTop: 5 }}>
                {label}
              </label>
            }

            {(type === InputType.TEXT || type === InputType.PASSWORD || type === InputType.NUMBER || type === InputType.CURRENCY) &&
              <div className={'input-group'} style={{ width: !customWidth ? '100%' : customWidth }}>
                {addonItem &&
                  <span className="input-group-addon">{addonItem}</span>
                }

                <input
                  type={type.replace('currency', 'number')}
                  className={`form-control ${inputClass}`}
                  value={controlledValue}
                  placeholder={placeholder || label}
                  name={name} onChange={this.handleChange}
                  style={{ width: '100%', borderRadius: 5, ...inputStyle }} disabled={disabled}
                  onKeyDown={this._handleKeyDown}
                  {...inputProps}
                />
                {this.props.children}
              </div>
            }

            {type === InputType.TEXT_AREA &&
              <div>
                <textarea
                  onKeyDown={this._handleKeyDown}
                  maxLength={maxlength}
                  value={controlledValue}
                  placeholder={placeholder || label}
                  onChange={this.handleChange}
                  style={{ width: '100%', ...inputStyle }} className='form-control' rows={3}
                  disabled={disabled}
                />
              </div>
            }

            {type === InputType.DATE &&
              <div className="form-group input-group">
                <span className="input-group-addon"><i className="fa fa-calendar"  ></i></span>
                <DatePicker
                  selected={(controlledValue && isString(controlledValue) ? new Date(controlledValue) : (controlledValue as Date))}
                  showTimeSelect={!hideTime}
                  dateFormat={`MM/dd/yyyy ${hideTime ? '' : 'h:mm aa'}`}
                  onChange={(date) => this.handleChange(date)}
                  placeholderText={placeholder}
                  onChangeRaw={(event) => this.handleChange(new Date(event.target.value))}
                  timeIntervals={15} />
              </div>
            }

            {type === InputType.AUTOCOMPLETE &&
              <ReactAutocomplete
                items={autocompleteItems || []}
                shouldItemRender={(item: AutocompleteItem, value: string) => value.length > 0 && item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={(item: AutocompleteItem) => item.label}
                renderItem={(item: AutocompleteItem, highlighted: boolean) =>
                  <p
                    key={item.label}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                  >
                    {item.label}
                  </p>
                }
                value={autocompleteText}
                onSelect={(_: any, item: AutocompleteItem) => {
                  this.setState({ autocompleteText: item.label })
                  this.handleChange(item.value);
                }}
                onChange={(e: any) => this.setState({ autocompleteText: e.target.value })}
                inputProps={{ className: 'form-control', placeholder: placeholder }}
                wrapperStyle={{ width: '100%' }}
                menuStyle={{ zIndex: 5, padding: 5, maxHeight: 200, overflow: 'scroll' }}
              />
            }

            {type === InputType.TOGGLE &&
              <div className='input-group'>
                <Toggle
                  checked={controlledValue}
                  onChange={this.handleChange} />
              </div>
            }

            {type === InputType.SELECT &&
              <select className="form-control" defaultValue={defaultValue} value={controlledValue} onChange={this.handleChange}
                disabled={disabled}
              >
                {this.props.children}
              </select>
            }

            {type === InputType.CHECKBOX &&
              <div className="checkbox">
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" style={{ marginRight: 15 }} defaultChecked={value} onChange={this.handleChange} />
                  <span style={{ marginLeft: 2, textAlign: 'left' }}>{placeholder || checkboxContent}</span>
                </label>
              </div>
            }

          </div>
        </div>
      </div>
    );
  }
} 