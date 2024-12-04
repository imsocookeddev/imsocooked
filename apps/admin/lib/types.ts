export type SearchParams = { [key: string]: string | undefined };
import {
  type ControllerRenderProps,
  Field,
  FieldValues,
  FieldPath,
  Path,
} from "react-hook-form";

export type GeneralDropDownType = {
  id: string;
  name: string;
};

export type ProblemOrderProps = {
  id: number;
  name: string;
};

export type ModifiedControllerRenderProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = Omit<ControllerRenderProps<TFieldValues, TName>, "value"> & {
  value: string[];
};

export type MultipleChoiceControllerProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = Omit<ControllerRenderProps<TFieldValues, TName>, "value"> & {
  value: string;
};

export type GeneralSelectorProps = {
  renderProps: ModifiedControllerRenderProps<any, string>;
  options: GeneralDropDownType[];
  name: string;
};

export type ModifiedControllerRenderPropsProblemSelector<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = Omit<ControllerRenderProps<TFieldValues, TName>, "value"> & {
  value: number[];
};

export type ProblemOrderSelectorProps = {
  renderProps: ModifiedControllerRenderPropsProblemSelector<any, string>;
  options: ProblemOrderProps[];
  name: string;
};